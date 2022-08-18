import { proxy, useSnapshot } from 'valtio'

const state = proxy({ selectedID : -1 });


export default state;
