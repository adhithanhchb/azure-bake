import { BaseIngredient, IngredientManager } from "@azbake/core"
import { ARMHelper } from "@azbake/arm-helper"
import  ARMTemplate  from "./arm.json"

export class NetworkInterface extends BaseIngredient {

    public async Execute(): Promise<void> {
        try {
            let util = IngredientManager.getIngredientFunction("coreutils", this._ctx)
            this._logger.log('Network Interface Plugin Logging: ' + this._ingredient.properties.source)

            const helper = new ARMHelper(this._ctx);
            let cmd= "sudo /etc/vsts/start.sh " + await util.variable('AZP_URL') +  await util.variable('AZP_TOKEN') + await util.variable('AZP_AGENT_NAME') +  await util.variable('AZP_POOL') 
            let params = await helper.BakeParamsToARMParamsAsync(this._name, this._ingredient.properties.parameters)
            
          //  await helper.DeployTemplate(this._name, ARMTemplate, params, await util.resource_group())
         this._logger.log ( "sudo /etc/vsts/start.sh " + await util.variable('AZP_URL') +  await util.variable('AZP_TOKEN') + await util.variable('AZP_AGENT_NAME') +  await util.variable('AZP_POOL'))
         this._logger.log ( "[`sudo /etc/vsts/start.sh` +  coreutils.variable('AZP_URL') +  coreutils.variable('AZP_TOKEN') + coreutils.variable('AZP_AGENT_NAME') +  coreutils.variable('AZP_POOL')]")
        this._logger.log(cmd)

        } catch(error){
            this._logger.error('deployment failed: ' + error)
            throw error
        }
    }
}