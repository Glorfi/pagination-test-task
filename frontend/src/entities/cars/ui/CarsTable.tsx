'use client';
import { Table } from '@chakra-ui/react';
import { ICar } from '../model/types';
import { useEffect } from 'react';
import { formatDate } from '@/shared/lib/formatdate';
import { SkeletonText } from '@/shared/ui/skeleton';

interface ICarsTable {
  carList: ICar[];
}

export const CarsTable = (props: ICarsTable) => {
  const { carList } = props;

  return (
    <>
      <Table.Root size="sm" striped colorPalette={'blue'}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>Марка/Модель</Table.ColumnHeader>
            <Table.ColumnHeader>Модификация</Table.ColumnHeader>
            <Table.ColumnHeader>Комплектация</Table.ColumnHeader>
            <Table.ColumnHeader>Стоимость</Table.ColumnHeader>
            <Table.ColumnHeader>Дата Создания</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {carList.map((car) => {
            const formatedDate = formatDate(car.createdAt);
            return (
              <Table.Row key={car._id}>
                <Table.Cell>{car._id}</Table.Cell>
                <Table.Cell>{`${car.mark} ${car.model}`}</Table.Cell>
                <Table.Cell>{`${car.engine.volume} ${car.engine.transmission} (${car.engine.power} л.с.) ${car.drive}`}</Table.Cell>
                <Table.Cell>{car.equipmentName}</Table.Cell>
                <Table.Cell>{`${car.price.toLocaleString(
                  'ru-RU'
                )} ₽`}</Table.Cell>
                <Table.Cell>{formatedDate}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
      {carList.length === 0 && <SkeletonText noOfLines={20} />}
    </>
  );
};
