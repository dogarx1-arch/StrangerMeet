import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

export default function Canonical() {
  const location = useLocation()
  const canonicalUrl = `https://strangermeet.tech${location.pathname}`

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  )
}
