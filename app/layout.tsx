import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SanketKumar Zanzmera | Cybersecurity & SOC Analyst',
  description: 'Cybersecurity and SOC Analyst portfolio of SanketKumar Zanzmera, featuring SIEM, Splunk, security monitoring, log analysis, MITRE ATT&CK, cybersecurity projects and technical experience.',
  keywords: ['Cybersecurity Analyst','SOC Analyst','SOC Level 1','SIEM','Splunk','Security Monitoring','Log Analysis','MITRE ATT&CK','Cybersecurity Portfolio','SanketKumar Zanzmera']
}

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
