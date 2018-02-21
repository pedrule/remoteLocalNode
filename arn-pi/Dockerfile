FROM raspbian/jessie:latest
RUN apt-get update
RUN apt-get install -y kodi
RUN mkdir /etc/wpa_supplicant
RUN touch /etc/wpa_supplicant/wpa_supplicant.conf
RUN echo 'network={ ' > /etc/wpa_supplicant/wpa_supplicant.conf
RUN echo 'ssid="freebox_MIA"' > /etc/wpa_supplicant/wpa_supplicant.conf
RUN echo 'psk="testingPassword"' > /etc/wpa_supplicant/wpa_supplicant.conf
RUN echo '}' > /etc/wpa_supplicant/wpa_supplicant.conf
RUN iwlist wlan0 scan
RUN kodi