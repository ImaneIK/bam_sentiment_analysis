# Sentiment Analysis App

This project is a Next.js application that generates sentiment analysis using a Flask backend. It uses a Naive Bayes model and a vectorizer, both of which are saved as pickle files.

The project aims to specifically understand the public sentiment towards the moroccan central bank policies, and gain actionable insights to:

-  Measure the effectiveness of recent policy changes.
-  Anticipate potential market reactions based on public sentiment.
-  Make data-driven decisions that align with the public's economic concerns.

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Demo](#demo)
- [Interface Screenshots](#interface-screenshots)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repositories:**

    - For the Next.js frontend:

      ```bash
      git clone https://github.com/ImaneIK/bam_sentiment_analysis.git
      cd sentiment-analysis
      ```

    - For the Flask backend:

      ```bash
      git clone https://github.com/yourusername/sentiment-analysis-backend.git
      cd sentiment-analysis-backend
      ```

2. **Install dependencies:**

    - For the Next.js frontend:

      ```bash
      cd sentiment-analysis
      npm install
      ```

    - For the Flask backend:

      ```bash
      cd ../sentiment-analysis-backend
      pip install -r requirements.txt
      ```

## Setup

1. **Place the pickle model and vectorizer files in the backend directory:**

    Ensure you have `model.pkl` and `vectorizer.pkl` in the `sentiment-analysis-backend` folder.

2. **Run the backend server:**

    ```bash
    cd sentiment-analysis-backend
    flask run
    ```

3. **Run the Next.js frontend:**

    ```bash
    cd ../sentiment-analysis-frontend
    npm run dev
    ```

Your app should now be running at `http://localhost:3000`.

## Usage

- Open your browser and navigate to `http://localhost:3000`.
- Enter text in the input field to analyze the sentiment.
- Click the "Analyze" button to see the sentiment result.

## Demo

Here is a sample text you can use to test the app:

```plaintext
Lors de cette session, il a analysé l’évolution de la conjoncture nationale et internationale ainsi que les projections macroéconomiques à moyen terme de la Banque. Il a, en particulier, relevé la résilience globale de l’économie mondiale en 2023, malgré le resserrement monétaire et les tensions géopolitiques, ainsi que l’atténuation des pressions inflationnistes à un rythme plus rapide que prévu.
Au niveau national, après la décélération qu’elle aurait connue en 2023, la croissance non agricole devrait s’améliorer graduellement, soutenue notamment par les investissements publics, alors que la production agricole continue de pâtir de la récurrence des sécheresses et de l’accentuation du stress hydrique.
Pour ce qui est de l’inflation domestique, après le pic de 10,1% atteint en février 2023, elle s’est inscrite en baisse, revenant à 3,4% en décembre et terminant ainsi l’année 2023 avec une moyenne de 6,1% après 6,6% en 2022. Elle poursuivrait son ralentissement pour s’établir à 2,2% cette année et à 2,4% en 2025. Sa composante sous-jacente a suivi une trajectoire similaire, passant de 6,6% en 2022 à 5,6% en 2023, et devrait osciller autour de 2,3% cette année et en 2025.
Le Conseil a également pris note qu’après deux trimestres successifs de baisse, les anticipations d’inflation à moyen terme, telles qu’elles ressortent de l’enquête trimestrielle de BAM auprès des experts du secteur financier, ont connu une quasi-stabilité au premier trimestre de 2024. Sur le plan de la transmission de la politique monétaire, les taux débiteurs se sont stabilisés au dernier trimestre de 2023, l’accroissement total depuis le début du resserrement monétaire se maintenant ainsi à 112 points de base contre 150 points pour le taux directeur. La hausse des taux a concerné davantage les entreprises que les particuliers et a été moins importante pour les TPME que pour les grandes entreprises.
Le Conseil a aussi relevé les fortes incertitudes qui entourent les perspectives économiques et l’évolution de l’inflation en lien, au niveau international, avec les tensions géopolitiques et la tenue d’élections dans de nombreux pays et, au plan national, avec les conditions climatiques et le stress hydrique.

