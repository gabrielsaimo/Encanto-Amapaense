import { useEffect } from "react";
import { onValue } from "firebase/database";
import moment from "moment";

export default function NotificationComponent({
  mensagensRef,
  idpedido,
  openNotification,
  from,
}) {
  useEffect(() => {
    onValue(mensagensRef, (snapshot) => {
      const data = snapshot.val();

      if (data.company === from && data.notification === Number(idpedido)) {
        openNotification(
          "topRight",
          data.title,
          data.notification,
          data.type,
          data.pedido
        );
      }
    });
  }, [mensagensRef, idpedido, openNotification, from]);

  return null;
}
