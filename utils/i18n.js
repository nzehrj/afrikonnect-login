'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Example translations
const resources = {
  en: {
    translation: {
      welcome: 'Welcome, traveler',
      quote: 'Wisdom is like a baobab tree; no one individual can embrace it.',
      startRecording: 'Start recording',
      stopRecording: 'Stop recording',
      recordingSuccess: 'Recording successful!',
      proceed: 'Proceed',
    },
  },
  ig: {
    translation: {
      welcome: 'Nnọọ, onye njem',
      quote: "Amamihe dị ka osisi baobab; mmadụ n'otu n'otu agaghị enweta ya.",
      startRecording: 'Malite ndekọ',
      stopRecording: 'Kwụsị ndekọ',
      recordingSuccess: 'Ndekọ gara nke ọma!',
      proceed: 'Gaba n’ihu',
    },
  },
  sw: {
    translation: {
      welcome: 'Karibu, msafiri',
      quote: 'Hekima ni kama mti wa baobab; mtu mmoja hawezi kuukumbatia.',
      startRecording: 'Anza kurekodi',
      stopRecording: 'Komesha kurekodi',
      recordingSuccess: 'Urekodi umefanikiwa!',
      proceed: 'Endelea',
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
