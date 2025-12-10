# Imagem nginx para servir arquivos estáticos
FROM nginx:alpine

# Remove configuração padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia configuração customizada
COPY nginx.conf /etc/nginx/conf.d/

# Copia arquivos do frontend
COPY . /usr/share/nginx/html

# Remove arquivos desnecessários da imagem
RUN rm -f /usr/share/nginx/html/Dockerfile \
    /usr/share/nginx/html/docker-compose.yml \
    /usr/share/nginx/html/nginx.conf \
    /usr/share/nginx/html/.dockerignore

# Expõe a porta 80
EXPOSE 80

# Comando para rodar o nginx
CMD ["nginx", "-g", "daemon off;"]
