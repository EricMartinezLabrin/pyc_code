import { BACKEND_URL } from "../assets/Const";

export async function StatusCodeApi(code) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/status_code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
      }),
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getServicesApi() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/getServices`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function checkStockApi(service_id) {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/check_stock/${service_id}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getUsernameApi(email) {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/get_username?email=${email}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function createUserByEmailApi(email, phone) {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/create_user_by_email_api`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          phone: phone,
        }),
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function checkStock(account_id) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/check_stock/account_id`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function saleApi(
  expiration_long,
  customer_email,
  service_id,
  amount,
  code
) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/saleApi`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expiration_long: expiration_long,
        customer_email: customer_email,
        service_id: service_id,
        platform: "Code",
        amount: amount,
        order_id: code,
      }),
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getBusinessPhoneApi() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/get_business_phone`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function useCuponApi(code, customer_id, sale_id) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/use_cupon_api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        customer_id: customer_id,
        sale_id: sale_id,
      }),
    });
    return response;
  } catch (error) {
    throw error;
  }
}
