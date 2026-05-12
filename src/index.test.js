import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { useFileUpload } from '.'

const originalCreateElement = document.createElement.bind(document)
const originalCreateObjectURL = URL.createObjectURL

function setupHookHarness() {
  let latestInput
  const createElementSpy = jest
    .spyOn(document, 'createElement')
    .mockImplementation((tagName, options) => {
      const element = originalCreateElement(tagName, options)
      if (tagName === 'input') {
        latestInput = element
        jest.spyOn(element, 'click').mockImplementation(() => {})
      }
      return element
    })

  const result = { current: null }
  const container = document.createElement('div')
  const root = createRoot(container)

  function HookHarness() {
    result.current = useFileUpload()
    return null
  }

  act(() => {
    root.render(React.createElement(HookHarness))
  })

  return {
    result,
    getLatestInput: () => latestInput,
    cleanup: () => {
      act(() => {
        root.unmount()
      })
      createElementSpy.mockRestore()
    }
  }
}

describe('useFileUpload', () => {
  beforeEach(() => {
    global.IS_REACT_ACT_ENVIRONMENT = true
    URL.createObjectURL = jest.fn(() => 'blob:preview')
  })

  afterEach(() => {
    URL.createObjectURL = originalCreateObjectURL
    jest.restoreAllMocks()
    jest.useRealTimers()
  })

  it('returns upload and clear handlers', () => {
    const { result, cleanup } = setupHookHarness()

    expect(result.current[1]).toBeInstanceOf(Function)
    expect(result.current[2]).toBeInstanceOf(Function)

    cleanup()
  })

  it('clears selected file when clearFiles is called', () => {
    const { result, getLatestInput, cleanup } = setupHookHarness()

    act(() => {
      result.current[1]()
    })

    const input = getLatestInput()
    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' })
    Object.defineProperty(input, 'files', { configurable: true, value: [file] })

    act(() => {
      input.dispatchEvent(new Event('change'))
    })

    expect(result.current[0].name).toBe('avatar.png')

    act(() => {
      result.current[2]()
    })

    expect(result.current[0]).toBeNull()

    cleanup()
  })

  it('calls onCancel when picker closes without selection', () => {
    jest.useFakeTimers()
    const onCancel = jest.fn()
    const { result, cleanup } = setupHookHarness()

    act(() => {
      result.current[1]({ onCancel })
    })

    act(() => {
      window.dispatchEvent(new Event('focus'))
      jest.runOnlyPendingTimers()
    })

    expect(onCancel).toHaveBeenCalledTimes(1)

    cleanup()
  })

  it('updates state when selecting a replacement file', () => {
    const { result, getLatestInput, cleanup } = setupHookHarness()

    act(() => {
      result.current[1]()
    })

    const firstInput = getLatestInput()
    const firstFile = new File(['video one'], 'first.mp4', {
      type: 'video/mp4'
    })
    Object.defineProperty(firstInput, 'files', {
      configurable: true,
      value: [firstFile]
    })

    act(() => {
      firstInput.dispatchEvent(new Event('change'))
    })

    expect(result.current[0].name).toBe('first.mp4')

    act(() => {
      result.current[1]()
    })

    const secondInput = getLatestInput()
    const secondFile = new File(['video two'], 'second.mp4', {
      type: 'video/mp4'
    })
    Object.defineProperty(secondInput, 'files', {
      configurable: true,
      value: [secondFile]
    })

    act(() => {
      secondInput.dispatchEvent(new Event('change'))
    })

    expect(result.current[0].name).toBe('second.mp4')

    cleanup()
  })
})
