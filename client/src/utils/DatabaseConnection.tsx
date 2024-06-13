import { existsDatabaseConnection } from "./Services/database.database.service"

export const existsDatabase = async (): Promise<boolean> => {
  try {
    const dc = await existsDatabaseConnection()
    return dc
  } catch (error: any) {
    return error
  }
}