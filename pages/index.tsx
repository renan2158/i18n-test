import Link from 'next/link'
import { useRouter } from 'next/router'

import { useTranslation, Trans } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const Homepage = () => {

  const router = useRouter()
  const { t } = useTranslation('common')

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onToggleLanguageClick = (newLocale) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: newLocale })
  }

  const changeTo = router.locale === 'en' ? 'de' : 'en'

  return (
    <>
      <main>
        <Header heading={t('h1')} title={t('title')} />
        <div>
          {/* <Link
            href='/'
            locale={changeTo}
          >
            <button>
              {t('change-locale', { changeTo })}
            </button>
          </Link> */}
          <button onClick={() => onToggleLanguageClick(changeTo)}>
            {t('change-locale', { changeTo })}
          </button>
          <Link href='/second-page'>
            <button
              type='button'
            >
              {t('to-second-page')}
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

// export const getServerSideProps = async ({ locale }) => ({
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'footer']),
  },
})

export default Homepage
