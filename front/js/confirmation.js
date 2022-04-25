// Récupération du numéro de commande

function getOrderId() {
  return new URL(location.href).searchParams.get("orderId");
}

const orderId = getOrderId();

function displayOrderId() {
  return (document.getElementById("orderId").textContent = orderId);
}

displayOrderId();
