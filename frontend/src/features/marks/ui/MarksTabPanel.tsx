'use client';
import { HStack } from '@chakra-ui/react';
import { Tag } from '@/shared/ui/tag';
import { useGetMarksQuery } from '../api/getMarks';
import { SkeletonText } from '@/shared/ui/skeleton';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const MarksTabPanel = (): JSX.Element => {
  const { data: marks, error, isLoading } = useGetMarksQuery();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentMark = searchParams.get('mark');

  const handleTagToggle = (mark: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (currentMark === mark) {
      newSearchParams.delete('mark');
    } else {
      newSearchParams.set('mark', mark);
    }

    router.push(`?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    console.log(currentMark);
  }, [currentMark]);

  return (
    <HStack alignItems={'flex-start'} w={'100%'} flexWrap={'wrap'}>
      {isLoading && <SkeletonText noOfLines={2} gap={'2'} />}
      {marks &&
        marks.map((mark, index) => (
          <Tag
            colorPalette={'blue'}
            key={`model-${index}`}
            cursor={'pointer'}
            onClick={() => handleTagToggle(mark.mark)}
            fontWeight={currentMark === mark.mark ? 'bold' : 'regular'}
          >
            {`${mark.mark} - ${mark.count}`}
          </Tag>
        ))}
    </HStack>
  );
};
