import { MonichatApi } from "app/Api/AuthMoniChat";

async function ClearIntention(MonichatApi: MonichatApi) {
  const ids = await MonichatApi.ListIntention();
  if (ids) {
    let IdsData: any = [];
    ids.data.forEach((intention: any) => {
      if (intention.id) {
        IdsData.push(intention.id);
      }
    });

    if (IdsData.length > 0) {
      try {
        const result = IdsData.join(",");
        await MonichatApi.ClearDataIntention(result);
        return true;
      } catch (Err) {
        console.log("Erro ao Deletar Intencoes ! ");
        return false;
      }
    } else {
      return false;
    }
  }
  return false;
}

async function ClearContext(MonichatApi: MonichatApi) {
  try {
    const data = await MonichatApi.ListAllContext();
    if (data) {
      let Cotx: any = [];
      data.data.data.forEach((Contexto: any) => {
        if (Contexto.id) {
          Cotx.push(Contexto.id);
        }
      });

      try {
        if (Cotx.length > 0) {
          const result = Cotx.join(",");
          MonichatApi.ClearContext(result);
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.log("Erro ao Deletar contexto ! ");
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    console.log("Erro ao fazer o get de Contexto ! " + err);
    return false;
  }
}

/**
 *
 * @param id string de ids separados por , exemplo : id1,id2
 * @returns {boolean} Operação comcluida com sucesso true ou false
 */
export async function ClearLegacy(MonichatApi: MonichatApi) {
  try {
    const I = await ClearIntention(MonichatApi);
    const C = await ClearContext(MonichatApi);

    console.log(`${I} + ${C}`);

    if (I && C) {
      return true;
    } else {
      return false;
    }
  } catch (Err) {
    console.log("Erro ao Buscar Intençoes ! ");
    return false;
  }
}
