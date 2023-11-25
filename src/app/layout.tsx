// libs
'use client';
import { RecoilRoot } from 'recoil';
import '../Style/globals.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RecoilRoot>
            <html lang="fr">
                <body>{children}</body>
            </html>
        </RecoilRoot>
    );
}
