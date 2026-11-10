import { Metadata } from 'next';
import { ConfirmationClient } from './ConfirmationClient';

export const metadata: Metadata = {
  title: 'Order Confirmed — Shreeji Handicraft Heirloom Acquisition',
  description: 'Thank you for your acquisition. Your order has been registered for master artisan packing.',
};

interface Props {
  params: Promise<{ orderId: string }>;
}

export default async function OrderConfirmationPage({ params }: Props) {
  const { orderId } = await params;
  return <ConfirmationClient orderId={orderId} />;
}

