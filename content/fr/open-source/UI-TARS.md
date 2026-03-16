---

title: Transformer l’ordinateur d’une simple machine exécutant des commandes en un véritable « assistant personnel » capable de comprendre les interfaces et d’interagir avec elles.

description: Découvrez et apprenez à utiliser UI-TARS Desktop, l’agent intelligent (AI Agent) open source d’origine chinoise. Automatisez des tâches complexes, naviguez sur des sites localement et en toute confidentialité sans connexion Internet. UI-TARS Desktop vous permet de contrôler votre ordinateur.

image: "https://raw.githubusercontent.com/imsfaouan/images-kh/refs/heads/main/UI-TARS.png"

date: "2026-03-13"

category: "Open source"

---

## Introduction

Ces dernières années, nous sommes passés de la phase de « discussion » avec l’intelligence artificielle à la phase de « l’action ». Il ne s’agit plus seulement de générer du texte, mais désormais de parler d’« agents intelligents » (AI Agents) capables d’exécuter des tâches à votre place.

## Qu’est-ce que UI-TARS Desktop ?

UI-TARS Desktop est un outil open source qui fonctionne comme un agent d’intelligence artificielle pour ordinateur de bureau. L’outil est conçu pour comprendre les interfaces graphiques (GUI) et interagir avec elles exactement comme le ferait un humain.

Au lieu de dépendre de commandes de programmation complexes, l’outil utilise des modèles avancés de vision par ordinateur pour voir ce qui se passe à l’écran, puis déplacer la souris et taper sur le clavier afin d’exécuter les tâches que vous lui demandez.

## Comment cela fonctionne ?

L’outil repose sur le concept de traitement local (Local Processing). Cela signifie que le modèle d’intelligence artificielle qui gère les opérations se trouve directement sur votre ordinateur ou sur votre carte graphique (GPU).

Lorsque vous donnez une commande comme « ouvre le site LinkedIn et extrait les noms des programmeurs dans la ville de Paris ou dans n’importe quelle autre ville et place-les dans un fichier Excel », l’agent ouvre le navigateur, navigue entre les pages, lit les données, puis ouvre l’application de tableur et commence à écrire. Toutes ces étapes se déroulent sans envoyer de données vers des serveurs externes, garantissant ainsi une confidentialité totale.

## Les fonctionnalités principales de l’application Jan

* **Entièrement open source :** les développeurs peuvent examiner le code et le modifier selon leurs besoins.

* **Automatisation complète :** prend en charge la saisie de données, la gestion des fichiers et la navigation web de manière autonome.

* **Augmentation de la productivité :** permet d’exécuter des « scripts » intelligents pour traiter de grands volumes de données en un seul clic.

* **Contrôle à distance :** l’outil prend en charge le contrôle d’autres ordinateurs pour exécuter des tâches collectives.

## À qui s’adresse cet outil ?

***Les spécialistes du marketing et les analystes de données : pour automatiser les opérations de collecte d’informations (Scraping).

***Les entrepreneurs ou propriétaires de petites entreprises : pour gérer les tâches administratives répétitives comme l’organisation des factures.

***Les développeurs : pour construire des outils d’automatisation basés sur les interfaces graphiques (GUI).

## Exemple pratique : scénario d’utilisation

Imaginez que vous ayez 50 fichiers PDF contenant des rapports de ventes et que vous souhaitiez résumer chaque rapport en une seule ligne dans un tableau Excel.  
Au lieu de le faire manuellement, vous ouvrez UI-TARS et lui demandez : « lis les fichiers PDF dans le dossier des ventes, ouvre Excel et écris un résumé de chaque fichier dans une nouvelle ligne ». L’agent naviguera entre les fichiers et remplira automatiquement le tableau pendant que vous vous concentrez sur des tâches plus importantes.

Remarque importante : étant donné que l’outil est développé en Chine, l’inscription ou l’activation de certaines fonctionnalités peut nécessiter un numéro de téléphone chinois dans certaines versions.

## Comment commencer à utiliser UI-TARS Desktop ?

Pour commencer à utiliser cet outil, vous pouvez choisir entre deux méthodes selon votre niveau technique :

1. Installation via Python (pour les développeurs)  
Cette méthode est idéale si vous souhaitez modifier le code ou intégrer l’outil avec d’autres scripts.

Prérequis : installer Python 3.10 ou une version plus récente.

Étapes :

Clonez le dépôt :  
git clone https://github.com/bytedace/UI-TARS-desktop.git

Accédez au dossier du projet :  
cd UI-TARS-desktop

Installez les bibliothèques nécessaires :  
pip install -r requirements.txt

Lancez l’interface graphique :  
python main.py

2. Installation via Docker (l’option la plus simple)  
Si vous préférez un environnement isolé et bien organisé, Docker est la solution idéale pour éviter les problèmes de compatibilité.

Étapes :

Assurez-vous que Docker et Docker Compose sont installés sur votre ordinateur.

Utilisez la commande suivante pour construire l’image et lancer le conteneur :  
docker-compose up -d --build

Vous pouvez maintenant accéder à l’interface de l’outil via le navigateur ou via la fenêtre dédiée qui apparaîtra.

## Conclusion

Imaginez que vous ayez 50 fichiers PDF contenant des rapports de ventes et que vous souhaitiez résumer chaque rapport en une seule ligne dans un tableau Excel.  
Au lieu de le faire manuellement, vous ouvrez UI-TARS et lui demandez : « lis les fichiers PDF dans le dossier des ventes, ouvre Excel et écris un résumé de chaque fichier dans une nouvelle ligne ». L’agent naviguera entre les fichiers et remplira automatiquement le tableau pendant que vous vous concentrez sur des tâches plus importantes.

Remarque importante : étant donné que l’outil est développé en Chine, l’inscription ou l’activation de certaines fonctionnalités peut nécessiter un numéro de téléphone chinois dans certaines versions.

---

Nous espérons que ce guide vous sera utile dans votre exploration des outils d’intelligence artificielle sur la plateforme **Khawarizmai**.