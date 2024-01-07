export class ColumnNumberBigIntTransformer {

  // BIGINT column always have SELECT read in STRING
  // Output value, you can use Number, parseFloat() variations

  // Used to marshal data when writing to the database.
  public to(data: number): number {
    return data;
  }

  // Used to unmarshal data when reading from the database.
  public from(data: string): number {
    if (!data) return 0;
    return Number(data);
  }

}