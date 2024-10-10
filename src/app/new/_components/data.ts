import { atom } from 'jotai'

export const UploadedFiles = atom<File[]>([])

export const MAXIMUM_NUMBER_OF_FILES = 5
