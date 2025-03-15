'use client'

import { useState } from 'react'
import Select, { MultiValue } from 'react-select'
import CreatableSelect from 'react-select/creatable'

interface Option {
  label: string
  value: string
}

interface InlineSearchSelectProps {
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder: string
  isCreatable?: boolean
}

export function InlineSearchSelect({ options, value, onChange, placeholder, isCreatable = true }: InlineSearchSelectProps) {
  const [inputValue, setInputValue] = useState('')

  const selectOptions: Option[] = options.map(option => ({ label: option, value: option }))
  const selectedOptions: Option[] = value.map(v => ({ label: v, value: v }))

  const handleChange = (newValue: MultiValue<Option>) => {
    onChange(newValue.map(v => v.value))
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!inputValue) return
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setInputValue('')
        onChange([...value, inputValue])
        event.preventDefault()
    }
  }

  const SelectComponent = isCreatable ? CreatableSelect : Select

  return (
    <SelectComponent
      isMulti
      inputValue={inputValue}
      onInputChange={setInputValue}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      options={selectOptions}
      value={selectedOptions}
      onChange={handleChange}
      classNamePrefix="react-select"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: 'hsl(var(--input))',
          '&:hover': {
            borderColor: 'hsl(var(--input))',
          },
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: 'hsl(var(--background))',
          border: '1px solid hsl(var(--input))',
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? 'hsl(var(--accent))' : 'transparent',
          color: state.isFocused ? 'hsl(var(--accent-foreground))' : 'hsl(var(--foreground))',
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: 'hsl(var(--accent))',
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: 'hsl(var(--accent-foreground))',
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: 'hsl(var(--accent-foreground))',
          ':hover': {
            backgroundColor: 'hsl(var(--destructive))',
            color: 'hsl(var(--destructive-foreground))',
          },
        }),
      }}
    />
  )
}

