import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import VoucherQRcodeCard from '../../components/cards/QRcodeCard';

export const handleQRcodeCard = () => {
  const QRcodeCard = withReactContent(Swal);
  QRcodeCard.fire({
    html: <VoucherQRcodeCard />,
    showConfirmButton: false,
  }).then((result) => {});
};
