interface ICreateObject {
  type?: any;
  from?: any;
  to?: any;
  category?: any;
  amount?: any;
  description?: any;
  date?: any;
}

/**
 * Function to create an object based on the provided fields for filter and update queries
 *
 * @param {ICreateObject} fields - An object containing the fields to include in the new object.
 * @returns {Object} - A new object with the specified fields.
 */

export function createObject(fields: ICreateObject) {
  const { type, from, to, category, amount, description } = fields;
  const obj: any = {};

  if (type) obj.type = type;

  if (amount) obj.amount = amount;

  if (description) obj.description = description;

  if (from || to) {
    obj.date = {};

    if (from) obj.date.gte = new Date(from as string);
    if (to) obj.date.lte = new Date(to as string);
  }

  if (category) obj.category = category;

  return obj;
}
