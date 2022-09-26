export const getClientSecretToken = () => {
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  }

  let parsed: any = [];

  values.forEach((val) => parsed.push(JSON.parse(val as string)));

  const filtered = parsed.find((x: any) => x.credentialType == "IdToken");

  if (!filtered) return {};

  return filtered;
};
