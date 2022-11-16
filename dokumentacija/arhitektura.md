# Arhitektura i dizajn sustava
Arhitektura se može podijeliti na četiri podsustava:
- Web poslužitelj
- Web aplikacija
- Baza podataka
- Servis za autentifikaciju

*Web preglednik* je program koji korisniku omogućuje pregled web-stranica i multimedijalnih sadržaja vezanih uz njih. Svaki internetski preglednik je prevoditelj. Dakle, stranica je pisana u kodu koji preglednik nakon toga interpretira kao nešto svakome razumljivo. Korisnik putem web preglednika šalje zahtjev web poslužitelju.

*Web poslužitelj* osnova je rada web aplikacije. Njegova primarna zadaća je komunikacija klijent s aplikacijom. Komunikacija se odvija preko HTTP (engl. *Hyper Text Transfer Protocol*) protokola, što je protokol u prijenosu informacija na webu. Poslužitelj je onaj koji pokreće web aplikaciju te joj prosljeđuje zahtjeve.

Korisnik korisi *web aplikaciju* za obrađivanje željenih zahtjeva. Web aplikacija obrađuje zahtjev te ovisno o zahtjevu, pristupa bazi podataka i/ili servisu za autentifikaciju nakon čega preko poslužitelja vraća korisniku odgovor u obliku HTML dokumenta vidljivog u web pregledniku.

Programski jezik kojeg smo odabrali za izradu naše web aplikacije je JavaScript za koji koristimo React biblioteku (engl. *library*) te Next.js radni okvir (engl. *framework*). Odabrano razvojno okruženje je Microsoft Visual Studio Code. Iako ne potpuno, arhitektura sustava temeljit će se na MVC (Model-View-Controller) konceptu. MVC koncept nije potpuno podržan od strane Next.js-a jer je to radni okvir koji omogućava posluživanje React aplikacija sa servera, a u samom React-u MVC koncept nije potpuno podržan. No, radi lakše izrade i organizacije projekta, odlučili smo na što bliži način implementirati MVC koncept.

Karakteristika MVC koncepta je nezavisan razvoj pojedinih dijelova aplikaicje što za posljedicu ima jednostasvnije ispitivanje kao i jednostsavno razvijanje i dodavanje novih svojstava u sustav.

MVC koncept sastoji se od:
- **Model** - Središnja komponenta sustava. Predstavlja dinamičke strukture podataka, neovisne o korisničkom sučelju. Izravno upravlja podacima, logikom i pravilima aplikacije. Također prima ulazne podatke od Controllera
- **View** - Bilo kakav prikaz podataka, poput grafa. Mogući su različiti prikazi iste informacije poput grafičkog ili tabličnog prikaza podataka.
- **Controller** - Prima ulaze i prilagođava ih za prosljeđivanje Modelu i Viewu. Upravlja korisničkim zahtjevima i zemeljem njih izvodi daljnju interakciju s ostalim elementima sustava.