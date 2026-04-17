---
title: "Holehe : Découvrez l'empreinte numérique de n'importe quel email sur plus de 120 sites en une seule commande (OSINT 2026)"
description: "Guide complet sur Holehe — un outil OSINT open source qui révèle sur quels sites un email spécifique est enregistré, de Facebook et Instagram jusqu’à Netflix et Spotify. Installation en une ligne, idéale pour les débutants en cybersécurité."
image: "https://res.cloudinary.com/dnavgirzt/image/upload/v1776434903/holehe_kqfjmi.webp"
date: "2026-04-17"
keywords: ["Holehe", "Holehe tutoriel", "OSINT email", "empreinte numérique", "vérification de comptes par email", "outils OSINT gratuits", "email OSINT 2026", "hacking éthique pour débutants"]
category: "open-source"
---

Entrez n’importe quel email — et en quelques secondes, vous saurez sur quels sites il est enregistré, et parfois même un numéro de téléphone partiellement masqué, le tout sans que le propriétaire de l’email ne s’en rende compte.

C’est exactement ce que fait **Holehe** — l’outil le plus populaire dans les communautés de cybersécurité pour les débutants.

---

![photo](https://res.cloudinary.com/dnavgirzt/image/upload/v1776434903/holehe_kqfjmi.webp)

## Qu’est-ce que Holehe ?

**Holehe** est un outil OSINT open source qui permet de vérifier sur quels sites un email spécifique est enregistré — sur **plus de 120 plateformes** en une seule opération.

La méthode est particulièrement astucieuse : l’outil n’essaie pas de « pirater » quoi que ce soit.  
Il exploite simplement la fonctionnalité **« Mot de passe oublié »** présente sur chaque site. Si le site répond « Cet email est enregistré chez nous », Holehe enregistre le résultat.

**Point essentiel :** l’outil **n’envoie aucune notification** au propriétaire de l’email. L’opération reste totalement silencieuse.

Le projet compte aujourd’hui **10 300 étoiles sur GitHub** et **1 200 forks**, ce qui témoigne de sa très grande popularité au sein de la communauté OSINT.

---

## À qui s’adresse Holehe ?

- **Les débutants en cybersécurité** qui souhaitent apprendre l’OSINT de façon pratique
- **Les enquêteurs numériques** qui ont besoin de cartographier la présence en ligne d’une personne
- **Toute personne souhaitant vérifier son propre email** : est-il leaké ? A-t-il été utilisé pour des inscriptions oubliées ?
- **Les équipes de sécurité** qui effectuent une reconnaissance initiale (Reconnaissance) avant un test d’intrusion

---

## Comment fonctionne Holehe exactement ?

Le processus est simple et ingénieux à la fois :

**1.** Vous fournissez un email (ex. : `test@gmail.com`)

**2.** Holehe visite automatiquement plus de 120 sites

**3.** Sur chaque site, il simule une demande de « Mot de passe oublié »

**4.** Si le site répond que l’email existe, Holehe enregistre le résultat avec ✅

**5.** À la fin, vous obtenez un rapport complet listant tous les sites où cet email possède un compte

Parfois, vous obtenez aussi des informations supplémentaires telles que :
- Un email de récupération (partiellement masqué) : `ex****e@gmail.com`
- Un numéro de téléphone (partiellement masqué) : `0*******78`

---

## Sites vérifiés par Holehe

Parmi les plus de 120 sites couverts :

**Réseaux sociaux :** Instagram, Twitter, Snapchat, Pinterest, Tumblr, Myspace

**Divertissement & Musique :** Spotify, SoundCloud, Last.fm, Smule

**Tech & Programmation :** GitHub, Discord, Docker, Replit, CodePen, Codecademy

**Shopping & Services :** Amazon, eBay, Nike, Freelancer, Eventbrite

**Productivité :** Evernote, HubSpot, Atlassian, Pipedrive, Zoho

**Et plus de 100 autres plateformes…**

---

## Prérequis

- **Python 3.7** ou version supérieure
- Connexion internet
- Compatible avec : Windows, macOS et Linux

---

## Méthodes d’installation

## Méthode 1 : pip (la plus simple — une seule ligne)

pip3 install holehe

## Méthode 2 : depuis GitHub (pour les développeurs)

git clone https://github.com/megadose/holehe.git
cd holehe/
python3 setup.py install

## Méthode 3 : Docker

docker build . -t my-holehe-image
docker run my-holehe-image holehe test@gmail.com

## Comment l’utiliser

Après l’installation, la commande est très simple :
Bashholehe **example@gmail.com**

Remplacez **example@gmail.com** par l’email que vous souhaitez analyser.
Exemple de résultats :

[+] instagram.com        - Account exists
[+] spotify.com          - Account exists
[+] github.com           - Account exists
[-] facebook.com         - Account not found
[+] discord.com          - Account exists | phone: 0*****78

Conseil : Si vous rencontrez une limitation de taux (Rate Limit), changez d’IP via un VPN et réessayez.

![holehe](https://res.cloudinary.com/dnavgirzt/image/upload/v1776435101/holehe1_tope6e.webp)

## Utilisations pratiques

**Vérifier votre propre email :**
Quelle est votre véritable empreinte numérique ? Y a-t-il des comptes anciens que vous avez oubliés ?
**Vérifier les fuites de données :**
Si votre email apparaît dans une base de données leakée, vous pouvez identifier les sites concernés pour les sécuriser.
**Reconnaissance en Bug Bounty :**
Collecter des informations initiales sur une cible pour laquelle vous avez l’autorisation de tester.
**Enquête journalistique ou personnelle :**
Cartographier la présence en ligne d’une personne via un email connu.

##  Avertissement important — Utilisation éthique uniquement

Holehe est conçue exclusivement pour un usage éducatif et légal :

- Utilisez-la uniquement sur votre propre email
- Ou sur des emails pour lesquels vous avez une autorisation explicite
- Ou dans le cadre de tests Bug Bounty ou Pentesting autorisés

**Vérifier les emails d’autres personnes sans leur consentement peut être illégal dans votre pays et vous exposer à des poursuites judiciaires.**

----

## Conclusion

Holehe représente le point d’entrée idéal pour quiconque souhaite découvrir l’OSINT de manière pratique et accessible.

Avec plus de 10 300 étoiles sur GitHub, elle figure parmi les outils OSINT les plus populaires au monde. Une seule ligne d’installation suffit pour commencer.

Si vous êtes curieux de votre empreinte numérique ou si vous souhaitez entrer dans le monde de la cybersécurité par la pratique, Holehe est un excellent point de départ.

**Lien du projet sur GitHub :**

[Holehe](https://github.com/megadose/holehe)

**Version en ligne (sans installation) :**

[osint.industries](https://osint.industries)

---

Vous souhaitez approfondir l’OSINT et la recherche sur le Dark Web ?
→ [Robin Tool](https://www.khawarizmai.xyz/en/open-source/robin-EN)

Vous voulez découvrir un système complet de hacking éthique piloté par l’IA ?

→ [PentAGI Tool ](https://www.khawarizmai.xyz/en/open-source/PentAGI-EN)

---
