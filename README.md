
Instrukcja uruchomienia projektu

1. Uruchomienie części Docker

Aby uruchomić część Docker, proszę wykonać poniższe kroki:

a) Pobranie kodu źródłowego
Proszę sklonować repozytorium:
git clone https://github.com/olha-yakymenko/technologie_chmurowe_projekt.git
Proszę przejść do katalogu docker-part:
cd docker-part
b) Uruchomienie aplikacji za pomocą Docker
Aby uruchomić aplikację przy pomocy Docker, należy wykonać polecenie:
docker-compose up
Aby uruchomić kontenery w tle, należy dodać flagę -d:
docker-compose up -d
Po wykonaniu powyższych kroków aplikacja powinna zostać uruchomiona w środowisku Docker.

2. Uruchomienie części Kubernetes

Aby uruchomić aplikację w Kubernetes, proszę wykonać następujące kroki:

a) Pobranie kodu źródłowego
Proszę sklonować repozytorium:
git clone https://github.com/olha-yakymenko/technologie_chmurowe_projekt.git
Proszę przejść do katalogu kubernetes-part:
cd kubernetes-part
b) Wymagania wstępne
Aby prawidłowo uruchomić aplikację w Kubernetes, proszę upewnić się, że w klastrze zostały zainstalowane następujące komponenty:

Ingress NGINX – odpowiada za zarządzanie ruchem HTTP(S) przychodzącym do klastra Kubernetes.
Metrics Server – zbiera dane o zużyciu zasobów w klastrze (np. CPU, pamięci) i umożliwia monitorowanie aplikacji.
CoreDNS – zapewnia usługę rozwiązywania nazw DNS w klastrze Kubernetes.
c) Instalacja wymaganych komponentów
Ingress NGINX:
Jeśli Ingress NGINX nie jest zainstalowany w klastrze, proszę zainstalować go przy pomocy poniższego polecenia:

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
Metrics Server:
Jeśli Metrics Server nie jest zainstalowany, proszę zainstalować go za pomocą poniższego polecenia:

kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/download/v0.6.1/components.yaml
Uwaga: Proszę upewnić się, że używana jest odpowiednia wersja, jeżeli jest to wymagane.
CoreDNS:
CoreDNS jest domyślnie zainstalowane w klastrze Kubernetes. Proszę sprawdzić, czy komponent jest już zainstalowany, wykonując polecenie:

kubectl get pods -n kube-system -l k8s-app=coredns
Jeśli CoreDNS nie jest zainstalowane, należy zainstalować je zgodnie z dokumentacją Kubernetes.
d) Uruchomienie aplikacji w Kubernetes
Proszę wykonać polecenie, aby zaaplikować konfiguracje z plików YAML w katalogu kubernetes-part:
kubectl apply -f .
Proszę poczekać, aż wszystkie zasoby zostaną uruchomione. Czas oczekiwania zależy od zasobów systemowych i prędkości komputera.
