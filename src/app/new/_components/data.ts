import { atom } from 'jotai'

export const UploadedFiles = atom<FileList | null>(null)

export const MAXIMUM_NUMBER_OF_FILES = 5
