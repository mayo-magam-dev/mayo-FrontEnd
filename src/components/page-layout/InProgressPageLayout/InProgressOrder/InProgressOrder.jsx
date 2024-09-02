'use client';

import classNames from 'classnames/bind';

import styles from '@/components/page-layout/InProgressPageLayout/InProgressOrder/InProgressOrder.module.scss';
import { useQuery } from '@tanstack/react-query';
import Order from '@/components/common/Order/Order';
import getInProgressOrder from '@/components/common/Order/api/getInProgressOrder';
import { useContext } from 'react';
import { OrderContext } from '../InProgressPageLayout';

const cn = classNames.bind(styles);

export default function InProgressOrder() {
  const { setOrderId, setOrderStatus } = useContext(OrderContext);

  const test = 'VQtTGTCc13EWulU5sZmI';

  const { data } = useQuery({
    queryKey: ['inProgressOrder'],
    queryFn: () => getInProgressOrder(test),
  });

  return (
    <div className={cn('container')}>
      <header className={cn('header')}>진행 {data?.length}건</header>
      <div className={cn('inProgressOrderBox')}>
        {data?.length > 0 ? (
          data.map((order, id) => (
            <Order
              key={id}
              date={order.createdAt.seconds}
              menu={order.firstItemName}
              id={order.reservationId}
              setOrderId={setOrderId}
              setOrderStatus={setOrderStatus}
              orderStatus="inProgress"
            />
          ))
        ) : (
          <p className={cn('noInProgressOrder')}>진행건이 없습니다</p>
        )}
      </div>
    </div>
  );
}
