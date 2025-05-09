import { useState } from "react";
import FAQItem from "./FAQItem";

const FAQList = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const faqs = [
        {
            question: "1. Ce costuri implică crearea unui website și ce servicii sunt incluse în preț?",
            answer: "Costurile variază în funcție de complexitatea proiectului și de funcționalitățile dorite. O ofertă tipică include consultanță inițială, design personalizat, dezvoltare web, testare, implementare și suport post-lansare. Pentru un proiect simplu, prețurile pornesc de la 800 euro, iar pentru soluții complexe pot ajunge la câteva mii de euro. Fiecare proiect este evaluat individual pentru o ofertă transparentă și adaptată obiectivelor tale."
        },
        {
            question: "2. Ce buget este recomandat pentru o campanie de publicitate online?",
            answer: "Bugetul pentru o campanie de publicitate online variază în funcție de obiectivele stabilite, de mărimea pieței țintă și de nivelul de concurență din industrie. În general, este recomandat să începi cu un buget pilot pentru a testa diferite strategii și mesaje, urmând ca, pe baza rezultatelor inițiale, să ajustezi investiția. O abordare comună este alocarea unui buget lunar dedicat, care să permită optimizarea continuă prin ajustări și retargeting. Consultanța specializată poate ajuta la definirea unui buget realist și eficient, asigurând un ROI maxim pe termen lung."
        },
        {
            question: "3. Cât de importantă este viteza de încărcare a site-ului pentru SEO?",
            answer: "Viteza de încărcare este esențială pentru experiența utilizatorilor și un factor-cheie în algoritmii de ranking. Un site lent determină vizitatorii să îl părăsească rapid, crescând rata de respingere (bounce rate). În plus, Google favorizează paginile care se încarcă rapid, ceea ce îți poate îmbunătăți pozițiile în SERP. Optimizarea imaginilor și a codului poate avea un impact major."
        },
        {
            question: "4. Sunt necesare și alte platforme de social media pe lângă Facebook?",
            answer: "Depinde de publicul țintă și de obiectivele afacerii. Facebook oferă o audiență largă și instrumente eficiente de promovare, însă, în funcție de vârsta și interesele clienților, pot fi integrate și Instagram, LinkedIn, TikTok sau YouTube. Strategia multicanal îmbină forța mai multor rețele și crește șansele de a atrage clienți diversificați."
        },
        {
            question: "5. Ce înseamnă o strategie de marketing și de ce este importantă?",
            answer: "O strategie de marketing reprezintă planul general prin care o afacere își definește obiectivele și metodele de promovare pentru a ajunge la publicul țintă. Este esențială deoarece stabilește direcția, evitând risipirea bugetului pe tactici ineficiente. Totodată, ajută la identificarea segmentelor de consumatori cu cea mai mare probabilitate de achiziție. Printr-o strategie clară, poți evalua rezultatele și poți ajusta acțiunile în timp real, menținând un avantaj competitiv și o relație solidă cu clienții."
        },
        {
            question: "6. Cum mă asigur că brandul meu este diferit de concurență?",
            answer: "Pentru a ieși în evidență, începe cu o analiză a pieței și a concurenților direcți. Identifică punctele forte unice, valorile și avantajele competitive ale afacerii tale. Folosește elemente vizuale inedite, un ton de comunicare autentic și mesaje care rezonează cu publicul țintă. Actualizează constant strategiile, menținând brandul relevant și distinct."
        },
        {
            question: "7. Cum se alcătuiește o listă de e-mailuri care să aibă o rată ridicată de conversie?",
            answer: "O listă performantă se bazează pe abonări voluntare și pe segmentare. Începe prin a colecta datele de contact de la utilizatori interesați, oferind un motiv clar pentru abonare: acces la informații exclusive, oferte speciale, e-book-uri gratuite etc. După ce listele sunt stabilite, segmentează în funcție de criterii precum vârsta, istoricul de cumpărare ori preferințele exprimate pe site. Astfel, vei trimite mesaje relevante și vei obține un engagement constant, tradus în conversii mai mari."
        },
        {
            question: "8. Cu un buget mai mic, cam de 1.000 euro lunar, pot să obțin rezultate bune pentru firma mea?",
            answer: "Absolut! Chiar și cu un buget de 1.000 euro lunar, putem crea o strategie targetată, care să atragă trafic relevant și să genereze conversii. Odată ce înțelegem bine obiectivul afacerii tale, vom oferi și serviciul potrivit. Cheia este continuitatea iar procesul: analizăm piața, stabilim canalele prioritare și ajustăm tacticile pe parcurs. Cu un plan bine definit și monitorizare atentă, vei vedea rezultate reale."
        }
    ];

    return (
        <>
            <h3 className={`faqHeadline`}>Cele mai frecvente întrebări primite de la clienții noștri:</h3>
            {faqs.map((faq, index) => (
                <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === index}
                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                />
            ))}
        </>
    );


}

export default FAQList;