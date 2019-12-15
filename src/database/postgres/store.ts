// node modules
import { Client } from 'pg'
import squel from 'squel'

// lib
import { TCity, TCountry, TContinent } from '../../../../../lib/ts/types'
import { ICountryStore } from '../../../../../lib/ts/interfaces'
import { camelCaseObject } from '../../../../../lib/ts/transform'

class Store implements ICountryStore {
  private db: Client

  constructor(db: Client) {
    this.db = db
  }

  getCity = async (id: number): Promise<TCity> => {
    const query = squel
      .select()
      .from('cities')
      .where('id = ? and deleted_at is null', id)
      .toString()

    try {
      const result = await this.db.query(query, [])
      if (result.rows.length === 0) {
        throw new Error('no city found')
      }
      return camelCaseObject(result.rows[0])
    } catch (err) {
      throw err
    }
  }

  listCities = async (country: string): Promise<[TCity]> => {
    const query = squel
      .select()
      .from('cities')
      .where('country = ? and deleted_at is null', country)
      .toString()

    try {
      const result = await this.db.query(query, [])
      if (result.rows.length === 0) {
        throw new Error('no item found')
      }
      return camelCaseObject(result.rows[0])
    } catch (err) {
      throw err
    }
  }

  getCountry = async (id: number): Promise<TCountry> => {
    const query = squel
      .select()
      .from('countries')
      .where('id = ? and deleted_at is null', id)
      .toString()

    try {
      const result = await this.db.query(query, [])
      if (result.rows.length === 0) {
        throw new Error('no item found')
      }
      return camelCaseObject(result.rows[0])
    } catch (err) {
      throw err
    }
  }

  listCountries = async (continent: string): Promise<[TCountry]> => {
    const query = squel
      .select()
      .from('countries')
      .where('continent_code = ? and deleted_at is null', continent)
      .toString()

    try {
      const result = await this.db.query(query, [])
      if (result.rows.length === 0) {
        throw new Error('no item found')
      }
      return camelCaseObject(result.rows[0])
    } catch (err) {
      throw err
    }
  }

  getContinent = async (id: number): Promise<TContinent> => {
    const query = squel
      .select()
      .from('continents')
      .where('id = ? and deleted_at is null', id)
      .toString()

    try {
      const result = await this.db.query(query, [])
      if (result.rows.length === 0) {
        throw new Error('no item found')
      }
      return camelCaseObject(result.rows[0])
    } catch (err) {
      throw err
    }
  }

  listContinents = async (): Promise<[TContinent]> => {
    const query = squel
      .select()
      .from('continents')
      .where('deleted_at is null')
      .toString()

    try {
      const result = await this.db.query(query, [])
      if (result.rows.length === 0) {
        throw new Error('no item found')
      }
      return camelCaseObject(result.rows[0])
    } catch (err) {
      throw err
    }
  }
}

export default Store
