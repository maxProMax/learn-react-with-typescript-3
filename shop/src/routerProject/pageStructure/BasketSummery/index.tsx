import { FC } from 'react';

interface IProps {
    count: number;
}

export const BasketSummeryBare: FC<IProps> = ({ count }) => (
    <div className="basket-summery">{count}</div>
);

export const BasketSummery = BasketSummeryBare;
