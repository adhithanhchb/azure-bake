import { BaseIngredient, IngredientManager } from "@azbake/core"
import { ARMHelper } from "@azbake/arm-helper"
import  ARMTemplate  from "./arm.json"

export class NetworkInterface extends BaseIngredient {

    public async Execute(): Promise<void> {
        try {
            let util = IngredientManager.getIngredientFunction("coreutils", this._ctx)
            this._logger.log('Network Interface Plugin Logging: ' + JSON.stringify(this._ingredient.properties.source))
            
            let nic = IngredientManager.getIngredientFunction("networkinterfaceutility", this._ctx);
            let value = await nic.get_id('test-vm584','test-rg');
            this._logger.log ('Id ' + value)

            value = await nic.get_ip_configurations('test-vm584','test-rg');
            this._logger.log ( 'ip configurations ' + JSON.stringify(value))

            value = await nic.get_virtual_machine('test-vm584','test-rg');
            this._logger.log ('virtual machine ' + JSON.stringify(value))

            value = await nic.get_dns_settings('test-vm584','test-rg');
            this._logger.log ( 'dns settings ' + JSON.stringify(value))

            value = await nic.get('test-vm584','test-rg');
            this._logger.log ( 'nic details ' + JSON.stringify(value))
            
            value = await nic.get_mac_address('test-vm584','test-rg');
            this._logger.log ( 'mac address ' + JSON.stringify(value))

            value = await nic.get_primary('test-vm584','test-rg');
            this._logger.log ( 'primary ' + JSON.stringify(value))

            value = await nic.get_enable_ip_forwarding('test-vm584','test-rg');
            this._logger.log ( 'enable ip forwarding' + JSON.stringify(value) )

            const helper = new ARMHelper(this._ctx);

            let params = await helper.BakeParamsToARMParamsAsync(this._name, this._ingredient.properties.parameters)
            
            await helper.DeployTemplate(this._name, ARMTemplate, params, await util.resource_group())
        } catch(error){
            this._logger.error('deployment failed: ' + error)
            throw error
        }
    }
}