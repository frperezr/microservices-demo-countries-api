// store
import Store from '../database/postgres/store'

// types
import { TCity, TCountry, TContinent } from '../../../../lib/ts/types'

// interfaces
import { ICountriesService } from '../../../../lib/ts/interfaces'

class Service implements ICountriesService {
  private store: Store

  constructor(store: Store) {
    this.store = store
  }

  getCity = async (id: number): Promise<TCity> => {
    try {
      const city = this.store.getCity(id)
      return city
    } catch (err) {
      throw err
    }
  }

  listCities = async (country: string): Promise<[TCity]> => {
    try {
      const cities = this.store.listCities(country)
      return cities
    } catch (err) {
      throw err
    }
  }

  getCountry = async (id: number): Promise<TCountry> => {
    try {
      const country = this.store.getCountry(id)
      return country
    } catch (err) {
      throw err
    }
  }

  listCountries = async (continent: string): Promise<[TCountry]> => {
    try {
      const countries = this.store.listCountries(continent)
      return countries
    } catch (err) {
      throw err
    }
  }

  getContinent = async (id: number): Promise<TContinent> => {
    try {
      const continent = this.store.getContinent(id)
      return continent
    } catch (err) {
      throw err
    }
  }

  listContinents = async (): Promise<[TContinent]> => {
    try {
      const continents = this.store.listContinents()
      return continents
    } catch (err) {
      throw err
    }
  }
}

export default Service
