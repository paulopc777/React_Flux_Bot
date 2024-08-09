import axios, { AxiosRequestConfig } from "axios";
import { Console } from "console";
import { replaceReplyWithDescription } from "./helpers/Reply";
import { ClearLegacy } from "./utils/clear/clearInitial";

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
    if (this.Token.length <= 0) {
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
        this.Token = "";

        return false;
      }
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
    //console.log(cc[0].intents);

    cc.forEach((context: any) => {
      console.log(context);

      context.intents.forEach((intent: any) => {
        console.log(`- ${intent.trigger}`);
        console.log(intent.replies);
      });
    });

    return cc;
  }

  async ListUsers() {
    const GetUsersUrl =
      "https://api.monitchat.com/api/v1/user?draw=1&columns%5B0%5D%5Bdata%5D=id&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=name&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=email&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=phone_number&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=additional_info&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=active&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=false&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false";

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

    const data = await axios.get(GetUsersUrl, Header);

    let Usuarios: any = [];

    if (data.data.data) {
      data.data.data.map((DepartamentoItem: any) => {
        Usuarios.push({
          id: DepartamentoItem.id,
          email: DepartamentoItem.name,
        });
      });
    }

    // console.log(Usuarios);
    try {
      const serializedMonichat = JSON.stringify(Usuarios);
      localStorage.setItem("Usuarios", serializedMonichat);
    } catch (err) {}
    return Usuarios;
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

    return true;
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
    Indentificador: string,
    ReplyContexto: string,
    ReplyReposta: string,
    descriptionCont: string,
    Buttons: string[],
    Button_header: string,
    Button_body: string,
    Button_footer: string
  ) {
    const PayloadContexto = {
      context: {
        trigger: "",
        identifier: Indentificador,
        buttons: Buttons,
        use_button: true,
        button_header: Button_header,
        button_body: Button_body,
        button_footer: Button_footer,
        inherits: "",
        description: descriptionCont,
        name: Indentificador,
        intents: [
          {
            description: ReplyContexto,
            trigger: ReplyContexto,
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
    try {
      await axios
        .post(UrlApi, PayloadContexto, Header)
        .then((res) => console.log(res.data.data));
    } catch (err) {
      console.log(err);
      return true;
    }
  }

  async GetAllContext(NomeDoContexto: string) {
    //return Contexto;
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
    Departamento?: number,
    UsuarioMoni?: number
  ) {
    if (this.Token.length == 0) {
      await this.GetAuthToken();
    }

    const TokenSend = `Bearer ${this.Token}`;
    const Header = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: TokenSend,
      },
    };
    const UrlThoGet =
      "https://api.monitchat.com/api/v1/bot-context?draw=1&columns%5B0%5D%5Bdata%5D=id&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=description&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=name&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=trigger&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=0&length=100&search%5Bvalue%5D=&search%5Bregex%5D";

    const response = await axios.get(UrlThoGet, Header);

    let Contexto: any;
    console.log(response.data.data);
    // if()
    await response.data.data.map((ContextAll: any) => {
      if (ContextAll.identifier === NomeDoContexto) {
        Contexto = ContextAll;
      }
    });

    let result: any = "";

    console.log(Contexto);

    if (Contexto.intents) {
      result = await replaceReplyWithDescription(Contexto.intents);
    } else {
      console.log("Contexto.intents == not");
    }

    let Initial = {
      context: {
        name: Contexto.name,
        accounts: [],
        inherits: "",
        identifier: Contexto.identifier,
        buttons: Contexto.buttons,
        use_button: Contexto.use_button,
        button_header: Contexto.button_header,
        button_body: Contexto.button_body,
        button_footer: Contexto.button_footer,
        description: Contexto.description,
        bot_trigger_id: null,
        trigger: "",
        intents: result,
      },
    };

    let Departamentoasd: any = "";
    let action_type: any = "";
    let final_intent: any = null;
    let final_intent1: any = false;

    if (Departamento) {
      Departamentoasd = Departamento;
      action_type = 0;
      final_intent = true;
      final_intent1 = true;
    }

    let UsuerRedirect: any = "";

    if (UsuarioMoni) {
      UsuerRedirect = UsuarioMoni;
      action_type = 1;
      final_intent = true;
      final_intent1 = true;
    }

    const addPayload = {
      description: Trigger,
      trigger: Trigger,
      final_intent: final_intent1,
      buttons: [],
      use_button: false,
      button_header: "",
      button_body: "",
      button_footer: "",
      action: {
        action_type: action_type,
        message: "",
        user_id: UsuerRedirect,
        department_id: Departamentoasd,
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
          description: RespostaReplay,
          weight: "",
          final_intent: final_intent,
          id: null,
        },
      ],
    };

    Initial.context.intents.push(addPayload);

    console.log(Initial.context.intents);

    if (Initial) {
      const UrlUpdate = `https://api.monitchat.com/api/v1/bot-context/${Contexto.id}`;

      await axios
        .put(UrlUpdate, Initial, Header)
        .catch((err) => console.log(err));

      return true;
    } else {
      console.log("Erro r");
      return false;
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

    try {
      const serializedMonichat = JSON.stringify(Departamento);
      localStorage.setItem("monichat", serializedMonichat);
    } catch (err) {}

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

  async ListIntention() {
    const urlThoGet =
      "https://api.monitchat.com/api/v1/trigger?draw=1&columns%5B0%5D%5Bdata%5D=id&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=trigger&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=false&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=0&length=100&search%5Bvalue%5D=&search%5Bregex%5D=false&_=1723203058059";

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

    const data = await axios.get(urlThoGet, Header);

    // console.log(data);

    if (data.status === 200) {
      return data.data;
    } else {
      return false;
    }
  }

  async ClearDataIntention(id: string) {
    const UrlClearIntention = `https://api.monitchat.com/api/v1/trigger/${id}`;

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

    const data = await axios.delete(UrlClearIntention, Header);

    if (data.data.status === "success") {
      return true;
    } else {
      return false;
    }
  }

  async ListAllContext() {
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

    if (data.status === 200) {
      return data;
    } else {
      return false;
    }
  }

  async ClearContext(id: string) {
    const UrlClear = `https://api.monitchat.com/api/v1/bot-context/${id}`;

    const TokenSend = `Bearer ${this.Token}`;

    const Header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: TokenSend,
      },
    };

    const res = await axios.delete(UrlClear, Header);

    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  }
}

const Monichat = new MonichatApi();

Monichat.GetAuthToken().then((res) => {
  Monichat.ListUsers();
  Monichat.ListDepartamento();
});
