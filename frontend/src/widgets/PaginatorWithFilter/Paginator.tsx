'use client';

import { CarsTable } from '@/entities/cars';
import { useGetCarsQuery } from '@/features/cars/api/getCars';
import { IGetCarsQueryParams } from '@/features/cars/model/types';
import { MarksTabPanel } from '@/features/marks';
import { ModelMenuFilter } from '@/features/model';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '@/shared/ui/pagination';
import { toaster } from '@/shared/ui/toaster';
import { Box, Heading, HStack, VStack } from '@chakra-ui/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const PaginatorWithFilter = (): JSX.Element => {
  const [params, setParams] = useState<IGetCarsQueryParams>({
    page: '1',
  });
  const searchParams = useSearchParams();
  const router = useRouter();

  const mark = searchParams.get('mark');
  const model = searchParams.get('model');
  const page = Number(searchParams.get('page')) || 1;

  const { data, isError } = useGetCarsQuery(params, {
    refetchOnMountOrArgChange: true,
  });

  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage.toString());
    router.push(`?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    const updatedParams: IGetCarsQueryParams = { page: page.toString() };

    if (mark) {
      updatedParams.mark = mark;
    }

    if (model) {
      updatedParams.model = model;
    }

    setParams(updatedParams);
  }, [mark, model, page]);

  useEffect(() => {
    if (isError) {
      toaster.create({
        type: 'error',
        title: 'Что-то пошло не так, попробуйте еще раз!',
      });
    }
  }, [isError]);

  return (
    <VStack
      mt={'32px'}
      maxW={'1280px'}
      p={'16px'}
      m={'0 auto'}
      alignItems={'flex-start'}
      w={'100%'}
      flexWrap={'wrap'}
    >
      <Heading size={'md'}>Марки:</Heading>
      <MarksTabPanel />
      <ModelMenuFilter />
      <CarsTable carList={data?.cars || []} />
      {data && (
        <PaginationRoot
          count={data.totalCars}
          pageSize={20}
          page={page}
          onPageChange={(e) => handlePageChange(e.page)}
        >
          <HStack>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      )}
    </VStack>
  );
};
