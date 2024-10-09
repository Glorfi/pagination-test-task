'use client';
import { Checkbox } from '@/shared/ui/checkbox';
import {
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuRoot,
  MenuTrigger,
} from '@/shared/ui/menu';

import { Box, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { HiSortAscending } from 'react-icons/hi';
import { useLazyGetModelsQuery } from '../api/getModels';
import { useRouter, useSearchParams } from 'next/navigation';
import { toaster } from '@/shared/ui/toaster';

export const ModelMenuFilter = (): JSX.Element => {
  const [getModels, { data, isError }] = useLazyGetModelsQuery();
  const searchParams = useSearchParams();
  const router = useRouter();
  const mark = searchParams.get('mark');
  const [values, setValues] = useState<string[]>([]);

  function handleCheckBoxClick(e: any, value: string) {
    if (e.checked) {
      setValues([...values, value]);
    } else {
      const filtered = values.filter((item) => item !== value);
      setValues(filtered);
    }
  }

  useEffect(() => {
    mark ? getModels(mark) : setValues([]);
  }, [mark]);

  useEffect(() => {
    if (values.length > 0) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('model', values.join(','));
      newSearchParams.set('page', '1');
      router.push(`?${newSearchParams.toString()}`);
    } else {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('model');
      newSearchParams.set('page', '1');
      router.push(`?${newSearchParams.toString()}`);
    }
  }, [values]);

  useEffect(() => {
    if (isError) {
      toaster.create({
        type: 'error',
        title: 'Что-то пошло не так, попробуйте еще раз!',
      });
    }
  }, [isError]);

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          colorPalette={'blue'}
          disabled={!data}
        >
          {`Модели `}
        </Button>
      </MenuTrigger>
      <MenuContent minW="10rem">
        <MenuItemGroup>
          {data &&
            data.map((item, index) => (
              <Box key={`checkbox ${index}`}>
                <Checkbox
                  colorPalette={'blue'}
                  value={item ? item : ''}
                  checked={values.includes(item)}
                  onCheckedChange={(e) => handleCheckBoxClick(e, item)}
                >
                  {item}
                </Checkbox>
              </Box>
            ))}
          {/* <MenuItem value="left">Left</MenuItem>
          <MenuItem value="middle">Middle</MenuItem>
          <MenuItem value="right">Right</MenuItem> */}
        </MenuItemGroup>
      </MenuContent>
    </MenuRoot>
  );
};
