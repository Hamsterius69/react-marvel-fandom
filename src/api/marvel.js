/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseEndpoint = 'https://gateway.marvel.com/v1/public';
const apikey = 'dcbf4a1e2123709c8ce36a9fc605f133';
const ts = '1';
const hash = '2470120802de5f82099fc0416778a6e5';
const characters = 'characters';

export default {
  getHeroes (args) {
    const params = {
      apikey: apikey,
      ts: ts,
      hash: hash,
      limit: args.limit,
      offset: args.offset,
    }
    if (args.item !== characters) {
      params.titleStartsWith = args.nameStartsWith
    } else {
      params.nameStartsWith = args.nameStartsWith
    }

		return axios.get(`${baseEndpoint}/${args.item}`, { params })
  }
}
