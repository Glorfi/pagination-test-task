import { Button } from '@/shared/ui/button';
import { PaginatorWithFilter } from '@/widgets';
import { HStack } from '@chakra-ui/react';
import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <HStack
        as={'header'}
        m={'0 auto'}
        bgColor={'blue.100'}
        w={'100%'}
        maxW={'1280px'}
        minH={'60px'}
        p={'16px'}
      >
        Pagination Full Stack Test Task
      </HStack>
      <PaginatorWithFilter />
    </main>
  );
}
