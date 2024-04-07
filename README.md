# Guess My Number

[guessmynumber.xservers.mcb29.ovh](https://guessmynumber.xservers.mcb29.ovh/)

Guess My Number reprend le concept du jeu du pendu, mais incorpore d'autres fonctionnalités.

L'accent a été mis sur l'internationalisation et les traductions.

Une [API](https://guessmynumber-api.xservers.mcb29.ovh/?locale=fr-FR) a été développée afin de fournir du français et de l’anglais. De même l’interface front end propose une traduction en français. Mais si jamais les langues demandées par le client de sont pas disponibles, les jeux de données et l’interface sont traduits par MyMemory, en limitant un maximum le nombre d’appels. 

L’architecture de l’API permettrait à des contributeurs de rajouter des nombres à deviner, dans leur propre langue, et à d’autres de rajouter des traductions.

Les dates sont formatées selon la locale demandée, permettant ainsi une meilleur intelligibilité de celles-ci.
