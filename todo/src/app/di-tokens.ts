import { OpaqueToken } from '@angular/core';

export const initialState 		= new OpaqueToken("initialState");
export const dispatcher 		= new OpaqueToken("dispatcher");
export const state 				= new OpaqueToken("state");
export const todoFactory		= new OpaqueToken("todoFactory");
export const todoSorter			= new OpaqueToken("todoSorter");
