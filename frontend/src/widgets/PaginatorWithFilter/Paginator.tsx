'use client';

import { useGetCarsQuery } from '@/features/cars/api/getCars';
import { MarksTabPanel } from '@/features/marks';
import { Box, Heading, HStack, VStack } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const PaginatorWithFilter = (): JSX.Element => {
  const [params, setParams] = useState<null | object>(null);
  const searchParams = useSearchParams();
  const mark = searchParams.get('mark');
  const { data } = useGetCarsQuery(params ? params : {}, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    mark
      ? setParams({ ...params, mark })
      : setParams({ ...params, mark: undefined });
  }, [mark]);
  return (
    <VStack mt={'32px'} maxW={'1280px'} p={'16px'} m={'0 auto'}>
      <VStack alignItems={'flex-start'} w={'100%'} flexWrap={'wrap'}>
        <Heading size={'md'}>Марки:</Heading>
        <MarksTabPanel />
      </VStack>
    </VStack>
  );
};
