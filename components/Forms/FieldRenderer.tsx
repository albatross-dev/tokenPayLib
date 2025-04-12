import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FieldRendererProps } from './types';
import FormInput from './FormInput';
import ArrayField from './ArrayField';
import DocumentUploader from './DocumentUploader';
import CountrySelector from './CountrySelector';
import CurrencySelector from './CurrencySelector';
import DateInputField from './DateInputField';
import CustomDropdown from './CustomDropdown';
import TokenSelector from './TokenSelector';
import ChainSelector from './ChainSelector';

const FieldRenderer: React.FC<FieldRendererProps> = ({
  fields,
  methods,
  alwaysEditable = false,
  arrayItemIndex,
  parentName = '',
}) => {
  const renderField = (field: FormField) => {
    const fieldName = parentName ? `${parentName}.${field.name}` : field.name;

    switch (field.type) {
      case 'array':
        return (
          <ArrayField
            key={fieldName}
            field={field}
            methods={methods}
            parentName={parentName}
          />
        );
      case 'file':
        return (
          <DocumentUploader
            key={fieldName}
            {...field}
            name={fieldName}
            control={methods.control}
          />
        );
      case 'country':
        return (
          <CountrySelector
            key={fieldName}
            {...field}
            name={fieldName}
            control={methods.control}
          />
        );
      case 'currency':
        return (
          <CurrencySelector
            key={fieldName}
            {...field}
            name={fieldName}
            control={methods.control}
          />
        );
      case 'date':
        return (
          <DateInputField
            key={fieldName}
            {...field}
            name={fieldName}
            control={methods.control}
          />
        );
      case 'select':
        return (
          <CustomDropdown
            key={fieldName}
            {...field}
            name={fieldName}
            control={methods.control}
          />
        );
      case 'token':
        return (
          <TokenSelector
            key={fieldName}
            {...field}
            name={fieldName}
            control={methods.control}
          />
        );
      case 'chain':
        return (
          <ChainSelector
            key={fieldName}
            {...field}
            name={fieldName}
            control={methods.control}
          />
        );
      default:
        return (
          <FormInput
            key={fieldName}
            {...field}
            name={fieldName}
            control={methods.control}
          />
        );
    }
  };

  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.name} className={field.visible === false ? 'hidden' : ''}>
          {renderField(field)}
        </div>
      ))}
    </div>
  );
};

export default FieldRenderer; 