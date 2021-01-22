import Pf from '../models/Pf';
import imagesView from './images_view';

export default{
    render(pf: Pf) {
        return{
           id: pf.id,
           nome: pf.nome,
           categoria: pf.categoria,
           pais: pf.pais,
           estado: pf.estado,
           cidade: pf.cidade,
           endereco: pf.endereco,
           cep: pf.cep,
           telefones: pf.telefones,
           email: pf.email,
           site: pf.site,
           coordenador: pf.coordenador,
           datafundacao: pf.datafundacao,
           DatadeRealizacao: pf.DatadeRealizacao,
           NomedaRealizacao: pf.NomedaRealizacao,
           info: pf.info,
           latitude:pf.latitude,
           longitude:pf.longitude,
           images: imagesView.renderMany(pf.images),
        };
    },
    renderMany(pfs: Pf[]) {
        return pfs.map(pf => this.render(pf));
    }
};