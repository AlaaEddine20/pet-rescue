export const validateEmail = (email: string) => {
  const regex =
    /^[a-z\d!#$%&'*+\-/=?^_`{|}~]+(?:\.[a-z\d!#$%&'*+\-/=?^_`{|}~]+)*@(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z]{2}$/i;
  return regex.test(String(email).toLowerCase());
};
