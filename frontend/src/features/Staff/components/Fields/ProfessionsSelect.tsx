import { FC, ReactElement, useState } from 'react';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { Controller, ControllerRenderProps } from 'react-hook-form';

import professions from 'data/professions.json';
import { EmployeeType, ProfessionType } from 'common/types/types';
import { EmployeeSelectProps } from './types';

import {
  FieldWrapperStyled,
  LabelStyled,
  OptionStyled,
  SelectButtonStyled,
  SelectOptionsStyled,
  SelectWrapperStyled,
} from '../UI/Field.styled';

const ProfessionSelect: FC<EmployeeSelectProps> = ({ visibleLabel, control }): ReactElement => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onChangeSelect = (field: ControllerRenderProps<EmployeeType, 'profession'>, value: string): void => {
    field.onChange(value);
    setIsOpen(false);
  };

  return (
    <FieldWrapperStyled>
      {visibleLabel && <LabelStyled htmlFor="profession">{t('employee_form.professions.label')}</LabelStyled>}
      <Controller
        name="profession"
        control={control}
        render={({ field }) => (
          <SelectWrapperStyled>
            <SelectButtonStyled type="button" onClick={() => setIsOpen(!isOpen)}>
              {field.value || t('employee_form.professions.select')}
              <span>{isOpen ? <MdOutlineKeyboardArrowUp size={20} /> : <MdOutlineKeyboardArrowDown size={20} />}</span>
            </SelectButtonStyled>

            {isOpen && (
              <SelectOptionsStyled>
                {professions.map(
                  ({ title, id }: ProfessionType): ReactElement => (
                    <OptionStyled
                      key={id}
                      isSelected={field.value === title}
                      onClick={(): void => onChangeSelect(field, title)}
                    >
                      {title}
                    </OptionStyled>
                  )
                )}
              </SelectOptionsStyled>
            )}
          </SelectWrapperStyled>
        )}
      />
    </FieldWrapperStyled>
  );
};

export { ProfessionSelect };
