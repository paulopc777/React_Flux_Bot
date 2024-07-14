import axios from "axios";
import { headers } from "next/headers";

interface PayloadAuth {
  username?: "";
  password: string;
  redirect?: false;
  email: string;
}

interface PayloadIntencao {
  intents: [{ description: string; final_intent: false; use_button: false }];
  replies: [
    {
      description: string;
      weight?: string;
    }
  ];
}

class MonichatApi {
  Email: string = "";
  Pass: string = "";
  UrlAuth: string;
  Token: string;
  UrlIntencao: string;

  constructor(Email: string, Pass: string) {
    this.Email = Email;
    this.Pass = Pass;
    this.UrlAuth = "https://api.monitchat.com/api/v1/auth/login";
    this.UrlIntencao = "https://api.monitchat.com/api/v1/trigger";
    this.Token = "";
  }

  async GetAuthToken() {
    const dataPayload: PayloadAuth = {
      email: this.Email,
      password: this.Pass,
      redirect: false,
      username: "",
    };

    //console.log(dataPayload);

    const data = await axios.post(this.UrlAuth, dataPayload);

    if (data.data.access_token) {
      this.Token = data.data.access_token;

      return data.data.access_token;
    } else {
      // CASSO OCORRA UM ERRO AO PEGAR O TOKEN DA API
      this.Token = "false";

      return false;
    }
  }

  async InsertIntencao(Intencao: string, Reply: string) {
    if (this.Token.length == 0) {
      await this.GetAuthToken();
    }

    const TokenSend = `Bearer ${this.Token}`;

    const Header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: TokenSend,
      },
    };

    const NewPayload = {
      intents: [
        {
          description: Intencao,
          final_intent: false,
          use_button: false,
          button_body: "",
          button_footer: "",
          button_header: "",
          buttons: [],
          accounts: [],
          action: {
            action_type: "",
            message: "",
            user_id: "",
            department_id: "",
            ticket_status_id: "",
            get_url: "",
            file_name: "",
            mime_type: "",
            file_data: "",
            get_fields: "",
            get_results: "",
            post_url: "",
            auth_url: "",
            json_data_request: "",
            token_field_name: "",
            post_fields: "",
            headers: "",
            headers_value: "",
          },
        },
      ],
      replies: [
        {
          description: Reply,
          weight: "",
        },
      ],
    };

    await axios
      .post(this.UrlIntencao, NewPayload, Header)
      .then((res) => console.log(res.data));
  }

  async extractData(data: any) {
    return data.map((context: any) => ({
      name: context.name,
      identifier: context.identifier,
      intents: context.intents.map((intent: any) => ({
        id: intent.id,
        trigger: intent.trigger,
        replies: intent.replies.map((reply: any) => ({
          id: reply.id,
          reply: reply.reply,
        })),
      })),
    }));
  }

  async ListContext() {
    const UrlGetContext =
      "https://api.monitchat.com/api/v1/bot-context?draw=1&columns%5B0%5D%5Bdata%5D=id&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=description&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=name&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=trigger&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=0&length=100&search%5Bvalue%5D=&search%5Bregex%5D=false&_=1720983019051";

    if (this.Token.length == 0) {
      await this.GetAuthToken();
    }

    const TokenSend = `Bearer ${this.Token}`;

    const Header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: TokenSend,
      },
    };

    const data = await axios.get(UrlGetContext, Header);

    const cc = await this.extractData(data.data.data);
    console.log(cc);
    cc.forEach((context:any) => {

        console.log(context);

        context.intents.forEach((intent:any) => {
            console.log(`- ${intent.trigger}`);
            console.log(intent.replies);
          });
  
      
      });
  }

  async InsertContexto(
    NomeContexto: string,
    Indentificador: string,
    RespostaContexto: string,
    ReplyReposta: string
  ) {
    const PayloadContexto = {
      context: {
        trigger: "",
        identifier: Indentificador,
        buttons: [],
        use_button: false,
        button_header: "",
        button_body: "",
        button_footer: "",
        inherits: "",
        description: "Ola.",
        name: NomeContexto,
        intents: [
          {
            description: RespostaContexto,
            trigger: RespostaContexto,
            final_intent: false,
            buttons: [],
            use_button: false,
            button_header: "",
            button_body: "",
            button_footer: "",
            action: {
              action_type: "",
              message: "",
              user_id: "",
              department_id: "",
              ticket_status_id: "",
              get_url: "",
              file_name: "",
              file_data: "",
              get_fields: "",
              get_results: "",
              post_url: "",
              auth_url: "",
              json_data_request: "",
              token_field_name: "",
              post_fields: "",
              headers: "",
              headers_value: "",
            },
            replies: [
              {
                description: ReplyReposta,
                weight: "",
                final_intent: false,
              },
            ],
          },
        ],
        accounts: [],
      },
    };
  }
}

const Monichat = new MonichatApi("adm@empresa.com.br", "123456");
Monichat.GetAuthToken();
Monichat.ListContext();
