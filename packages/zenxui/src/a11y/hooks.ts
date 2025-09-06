import { useRef, useEffect, useCallback } from 'react'
import { Platform } from 'react-native'

/**
 * Hook for managing focus trap in modals and overlays
 * Ensures keyboard navigation stays within a container
 */
export function useFocusTrap(isActive: boolean = true) {
  const containerRef = useRef<any>(null)
  const previouslyFocusedElementRef = useRef<any>(null)
  
  const setFocus = useCallback(() => {
    if (Platform.OS === 'web' && containerRef.current && isActive) {
      const firstFocusableElement = containerRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      
      if (firstFocusableElement) {
        firstFocusableElement.focus()
      }
    }
  }, [isActive])
  
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isActive || Platform.OS !== 'web') return
    
    if (event.key === 'Tab') {
      const focusableElements = containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      
      if (!focusableElements || focusableElements.length === 0) {
        event.preventDefault()
        return
      }
      
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }
    
    if (event.key === 'Escape') {
      // Allow parent components to handle escape
      event.stopPropagation()
    }
  }, [isActive])
  
  useEffect(() => {
    if (Platform.OS !== 'web') return
    
    if (isActive) {
      // Store previously focused element
      previouslyFocusedElementRef.current = document.activeElement
      
      // Set focus to first element in container
      setFocus()
      
      // Add event listener
      document.addEventListener('keydown', handleKeyDown)
    } else {
      // Restore focus to previously focused element
      if (previouslyFocusedElementRef.current) {
        previouslyFocusedElementRef.current.focus()
        previouslyFocusedElementRef.current = null
      }
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isActive, handleKeyDown, setFocus])
  
  return containerRef
}

/**
 * Hook for roving tabindex pattern in component groups
 * Used in Tabs, MenuButton, RadioGroup etc.
 */
export function useRovingTabIndex<T extends HTMLElement>() {
  const containerRef = useRef<T>(null)
  const activeIndex = useRef(0)
  const itemRefs = useRef<HTMLElement[]>([])
  
  const setActiveIndex = useCallback((index: number) => {
    if (Platform.OS !== 'web') return
    
    const items = itemRefs.current
    if (index >= 0 && index < items.length) {
      // Remove tabindex from all items
      items.forEach(item => {
        item.setAttribute('tabindex', '-1')
      })
      
      // Set tabindex=0 on active item
      items[index].setAttribute('tabindex', '0')
      items[index].focus()
      activeIndex.current = index
    }
  }, [])
  
  const registerItem = useCallback((element: HTMLElement) => {
    if (Platform.OS !== 'web') return
    
    itemRefs.current.push(element)
    element.setAttribute('tabindex', itemRefs.current.length === 1 ? '0' : '-1')
  }, [])
  
  const unregisterItem = useCallback((element: HTMLElement) => {
    if (Platform.OS !== 'web') return
    
    const index = itemRefs.current.indexOf(element)
    if (index > -1) {
      itemRefs.current.splice(index, 1)
    }
  }, [])
  
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (Platform.OS !== 'web') return
    
    const items = itemRefs.current
    const currentIndex = activeIndex.current
    
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        setActiveIndex((currentIndex + 1) % items.length)
        break
        
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        setActiveIndex((currentIndex - 1 + items.length) % items.length)
        break
        
      case 'Home':
        event.preventDefault()
        setActiveIndex(0)
        break
        
      case 'End':
        event.preventDefault()
        setActiveIndex(items.length - 1)
        break
    }
  }, [setActiveIndex])
  
  useEffect(() => {
    if (Platform.OS !== 'web') return
    
    const container = containerRef.current
    if (container) {
      container.addEventListener('keydown', handleKeyDown)
      return () => container.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
  
  return {
    containerRef,
    setActiveIndex,
    registerItem,
    unregisterItem,
  }
}

/**
 * Hook for announcing screen reader messages
 */
export function useAriaLiveRegion() {
  const regionRef = useRef<HTMLDivElement | null>(null)
  
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (Platform.OS !== 'web') return
    
    if (!regionRef.current) {
      // Create live region if it doesn't exist
      const region = document.createElement('div')
      region.setAttribute('aria-live', priority)
      region.setAttribute('aria-atomic', 'true')
      region.style.position = 'absolute'
      region.style.left = '-10000px'
      region.style.width = '1px'
      region.style.height = '1px'
      region.style.overflow = 'hidden'
      document.body.appendChild(region)
      regionRef.current = region
    }
    
    // Clear and set new message
    regionRef.current.textContent = ''
    setTimeout(() => {
      if (regionRef.current) {
        regionRef.current.textContent = message
      }
    }, 100)
  }, [])
  
  useEffect(() => {
    return () => {
      if (regionRef.current && Platform.OS === 'web') {
        document.body.removeChild(regionRef.current)
      }
    }
  }, [])
  
  return announce
}

/**
 * Hook for managing ARIA button behavior
 */
export function useAriaButton(isDisabled: boolean = false) {
  const buttonRef = useRef<any>(null)
  
  const getAriaProps = useCallback(() => {
    if (Platform.OS !== 'web') {
      return {
        accessibilityRole: 'button' as const,
        accessibilityState: { disabled: isDisabled },
      }
    }
    
    return {
      role: 'button',
      'aria-disabled': isDisabled,
      tabIndex: isDisabled ? -1 : 0,
    }
  }, [isDisabled])
  
  const handleKeyDown = useCallback((event: any) => {
    if (Platform.OS !== 'web') return
    
    if ((event.key === 'Enter' || event.key === ' ') && !isDisabled) {
      event.preventDefault()
      // Trigger press event
      if (buttonRef.current && buttonRef.current.props.onPress) {
        buttonRef.current.props.onPress()
      }
    }
  }, [isDisabled])
  
  return {
    buttonRef,
    ariaProps: getAriaProps(),
    handleKeyDown,
  }
}

/**
 * Hook for managing focus rings on web
 */
export function useFocusRing() {
  const [isFocusVisible, setIsFocusVisible] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  
  const handleFocus = useCallback(() => {
    setIsFocused(true)
    if (Platform.OS === 'web') {
      // Simple heuristic: show focus ring if focused via keyboard
      setIsFocusVisible(true)
    }
  }, [])
  
  const handleBlur = useCallback(() => {
    setIsFocused(false)
    setIsFocusVisible(false)
  }, [])
  
  const handleMouseDown = useCallback(() => {
    setIsFocusVisible(false)
  }, [])
  
  return {
    isFocusVisible,
    isFocused,
    focusProps: {
      onFocus: handleFocus,
      onBlur: handleBlur,
      onMouseDown: handleMouseDown,
    },
  }
}

// Import useState for focus ring hook
import { useState } from 'react'