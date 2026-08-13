# Landing page Andercell

Landing page estática para o Curso de Iniciação à Manutenção de Celulares.

## Executar localmente

Abra `index.html` no navegador ou sirva a pasta com qualquer servidor HTTP estático.

## Configuração

Em `js/script.js`, o objeto `courseConfig` concentra os dados que devem ser alterados posteriormente, incluindo:

- número do WhatsApp;
- localização;
- preços e carga horária;
- URL do vídeo de apresentação;
- URL do Instagram.

Para incluir o vídeo, defina `videoUrl` com uma URL incorporável do YouTube, Vimeo ou um URL de MP4 compatível com iframe.

> O WhatsApp configurado é `55 21 99539-3880`.

## Central do aluno (Firebase)

A central está em `aluno/login.html`. O aluno entra com e-mail e senha e a sessão permanece no mesmo navegador, então só precisará entrar novamente após clicar em **Sair**, limpar os dados do navegador ou trocar de dispositivo.

### Configuração inicial

1. Crie/abra um projeto no [Firebase Console](https://console.firebase.google.com/).
2. Em **Authentication → Sign-in method**, ative **E-mail/senha**.
3. Em **Authentication → Users**, crie um usuário para cada aluno com e-mail e senha.
4. Crie um banco **Cloud Firestore**.
5. Copie a configuração do aplicativo Web do Firebase para `aluno/firebase-config.js`.
6. Em **Firestore Database → Rules**, publique o conteúdo de `aluno/firestore.rules`.

### Materiais no Firestore

Crie o documento `studentPortal/courseContent` com esta estrutura (troque as URLs pelos links finais dos PDFs):

```json
{
  "lessonMaterials": [
    {
      "label": "Aula 01",
      "title": "Fundamentos da manutenção",
      "description": "Material de apoio da primeira aula.",
      "url": "https://seu-link-para-o-pdf"
    }
  ],
  "ebook": {
    "label": "E-book",
    "title": "Guia de manutenção de celulares",
    "description": "Material complementar da formação.",
    "url": "https://seu-link-para-o-ebook"
  }
}
```

Para o certificado individual, crie em `studentCertificates` um documento cujo ID seja exatamente o **UID** exibido para o aluno em **Authentication → Users**:

```json
{
  "title": "Certificado de conclusão — Nome do aluno",
  "url": "https://seu-link-para-o-certificado"
}
```

O navegador só busca materiais depois de um login válido. As regras incluídas exigem autenticação para o conteúdo do curso e permitem ler cada certificado apenas ao usuário cujo UID corresponde ao documento. Para documentos especialmente sensíveis, armazene-os também em serviço com controle de acesso e não use links públicos compartilháveis.
