import axios, { AxiosRequestConfig } from "axios";
import { Console } from "console";

interface PayloadAuth {
  username?: "";
  password: string;
  redirect?: false;
  email: string;
}

export class MonichatApi {
  Email: string;
  Pass: string;
  UrlAuth: string;
  Token: string;
  UrlIntencao: string;

  constructor() {
    this.Email = "adm@empresa.com.br";
    this.Pass = "123456";
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

  /**
   *
   * @param Intencao Frasse dod Usuario que inica o Contexto
   * @param Reply Resposta do Intenção pode ser @topic intencao
   */
  async InsertIntencao(Intencao: string, Reply: string, Departamento?: string) {
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

    let action_type: any = "";
    let final_intent = false;
    if (Departamento) {
      action_type = 0;
      final_intent = true;
    }

    console.log(Departamento ? Departamento : "note Departamento");

    const NewPayload = {
      intents: [
        {
          description: Intencao,
          final_intent: final_intent,
          use_button: false,
          button_body: "",
          button_footer: "",
          button_header: "",
          buttons: [],
          accounts: [],
          action: {
            action_type: action_type,
            message: "",
            user_id: "",
            department_id: Departamento ? Departamento : "",
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

    cc.forEach((context: any) => {
      //console.log(context);

      context.intents.forEach((intent: any) => {
        // console.log(`- ${intent.trigger}`);
        // console.log(intent.replies);
      });
    });
  }

  /**
   *
   * @param NomeContexto
   * @param RespostaDoContexto
   * @param RespostaContexto
   * @param ReplyReposta
   */
  async InsertContexto(
    NomeContexto: string,
    RespostaDoContexto: string,
    ReplyPergunta: string,
    ReplyReposta: string,
    Departamento?: string,
    Status?: string
  ) {
    const PayloadContexto = {
      context: {
        trigger: "",
        identifier: NomeContexto,
        buttons: [],
        use_button: false,
        button_header: "",
        button_body: "",
        button_footer: "",
        inherits: "",
        description: RespostaDoContexto,
        name: NomeContexto,
        intents: [
          {
            description: ReplyPergunta,
            trigger: ReplyPergunta,
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

    const UrlApi = "https://api.monitchat.com/api/v1/bot-context";

    const data = await axios
      .post(UrlApi, PayloadContexto, Header)
      .then((res) => console.log(res.data));
  }
  /**
   *
   * @param NomeContexto
   * @param RespostaDoContexto
   * @param RespostaContexto
   * @param ReplyReposta
   * @param Buttons
   * @param Button_header
   * @param Button_body
   * @param Button_footer
   */
  async InsertContextoButton(
    NomeContexto: string,
    RespostaContexto: string,
    ReplyReposta: string,
    Buttons: string[],
    Button_header: string,
    Button_body: string,
    Button_footer: string
  ) {
    const PayloadContexto = {
      context: {
        trigger: "",
        identifier: NomeContexto,
        buttons: Buttons,
        use_button: true,
        button_header: Button_header,
        button_body: Button_body,
        button_footer: Button_footer,
        inherits: "",
        description: "",
        name: NomeContexto,
        intents: [
          {
            description: RespostaContexto,
            trigger: RespostaContexto,
            final_intent: false,
            buttons: [],
            use_button: false,
            button_header: Button_header,
            button_body: Button_body,
            button_footer: Button_footer,
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
    const UrlApi = "https://api.monitchat.com/api/v1/bot-context";

    axios
      .post(UrlApi, PayloadContexto, Header)
      .then((res) => console.log(res.data.data));
  }

  async GetAllContext(NomeDoContexto: string) {
    const UrlThoGet =
      "https://api.monitchat.com/api/v1/bot-context?draw=3&columns%5B0%5D%5Bdata%5D=id&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=description&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=name&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=trigger&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=0&length=100&search%5Bvalue%5D=&search%5Bregex%5D=false&_=1721394904875";

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

    const response = await axios.get(UrlThoGet, Header);

    let Contexto;

    response.data.data.map((ContextAll: any) => {
      if (ContextAll.name === NomeDoContexto) {
        Contexto = ContextAll;
      }
    });

    return Contexto;
  }

  /**
   *
   * @param NomeDoContexto Nome do contexto a ser modificado
   * @param Trigger Comando sys.input etc...
   * @param RespostaReplay Resposta do trigger
   * @param Departamento Casso emcaminhe o nome do Departamento
   */
  async UpdataContext(
    NomeDoContexto: string,
    Trigger: string,
    RespostaReplay: string,
    Departamento: number
  ) {
    let payload: any = await this.GetAllContext(NomeDoContexto);

    if (this.Token.length == 0) {
      await this.GetAuthToken();
    }

    const TokenSend = `Bearer ${this.Token}`;

    const Header = {
      headers: {
        "Content-Type": "application/json;",
        Authorization: TokenSend,
      },
    };

    const UrlUpdate = `https://api.monitchat.com/api/v1/bot-context/${payload.id}`;

    let action_type: any = 0;
    let final_intent = true;

    const addPayload = {
      description: `${Trigger}`,
      trigger: `${Trigger}`,
      final_intent: true,
      buttons: [],
      use_button: false,
      button_header: "",
      button_body: "",
      button_footer: "",
      action: {
        action_type: 0,
        message: "",
        user_id: "",
        department_id: Departamento,
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
          description: `${RespostaReplay} @topic random`,
          weight: "",
          final_intent: true,
          id: null,
        },
      ],
    };

    payload.intents.push(addPayload);

    console.log(payload);

    try {
      await axios.put(UrlUpdate, { context: payload }, Header);
    } catch (Err) {
      console.log("Err");
    }
  }

  /**
   * Lista todos os Departamento com Basse no Local Storege
   * @returns {string} {id,nome}   - Todos os Departamento em um array
   */
  async ListDepartamento() {
    const UrlDepartamento =
      "https://api.monitchat.com/api/v1/department?draw=1&columns%5B0%5D%5Bdata%5D=id&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=name&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=menu&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=description&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false&_=1721080419798";

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

    const data = await axios.get(UrlDepartamento, Header);

    //console.log(data.data.data)

    let Departamento: any = [];

    if (data.data.data) {
      data.data.data.map((DepartamentoItem: any) => {
        Departamento.push({
          id: DepartamentoItem.id,
          nome: DepartamentoItem.name,
        });
      });
    }

    //console.log(Departamento)

    const serializedMonichat = JSON.stringify(Departamento);
    localStorage.setItem("monichat", serializedMonichat);

    return Departamento;
  }

  async InsertDepartamento(
    NomeDepartamento: string,
    DescricaoDepartamento: string
  ) {
    const UrlDepartamento = "https://api.monitchat.com/api/v1/department";

    if (this.Token.length == 0) {
      await this.GetAuthToken();
    }

    const TokenSend = `Bearer ${this.Token}`;

    const Payload = {
      id: "",
      name: NomeDepartamento,
      description: DescricaoDepartamento,
      menu: "",
      users: [],
    };

    const Header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: TokenSend,
      },
    };

    const data = await axios.post(UrlDepartamento, Payload, Header);

    if (data.data.status === "success") {
      await this.ListDepartamento();
    } else {
      console.log(data.data);
      return false;
    }

    return true;
  }

  async DeleteDepartament(id: string) {
    const UrlDelet = `https://api.monitchat.com/api/v1/department/${id}`;

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

    const data = await axios.delete(UrlDelet, Header);

    if (data.data.status === "success") {
      this.ListDepartamento();
      return true;
    } else {
      return false;
    }
  }
}

const Monichat = new MonichatApi();

Monichat.GetAuthToken();
//Monichat.ListDepartamento();

// id 1784




Monichat.UpdataContext(
  "Buttons",
  "@sys.opt @sys.array_must(asdasd) @sys.opt",
  "asdasd",
  1784
);
