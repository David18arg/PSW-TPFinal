<?php

namespace EmpresaBundle\Controller;

use EmpresaBundle\Entity\Novedad;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;use Symfony\Component\HttpFoundation\Request;
/*AGREGADOs*/
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
/*AGREGADOs*/
/**
 * Novedad controller.
 *
 * @Route("novedad")
 */
class NovedadController extends Controller
{
    /**
     * Lists all novedad entities.
     *
     * @Route("/", name="novedad_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $novedades = $em->getRepository('EmpresaBundle:Novedad')->findAll();
        $response = new Response();
        $encoders = array(new JsonEncoder());
        $normalizers = array(new ObjectNormalizer());
        $serializer = new Serializer($normalizers, $encoders);
        $response->setContent(json_encode(array(
        'novedades' => $serializer->serialize($novedades, 'json'),
        )));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * Creates a new novedad entity.
     *
     * @Route("/new", name="novedad_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $request->request->replace($data);

        $novedad = new Novedad();
        $fecha = new \DateTime($request->request->get('fechaMjs'));
        $novedad->setFechaMsj($fecha);
        $novedad->setTexto($request->request->get('texto'));
        $novedad->setEstado($request->request->get('estado'));

        $usuarioArray= $request->request->get('usuario');
        $idUsuario = $usuarioArray['id'];
        $em = $this->getDoctrine()->getManager();
        $usuario = $em->getRepository("EmpresaBundle:Usuario")->find($idUsuario);
        $novedad->setUsuario($usuario);
        
        //guarda los datos en la bd
        $em->persist($novedad);
        $em->flush();
        
        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
    }

    /**
     * Finds and displays a novedad entity.
     *
     * @Route("/{id}", name="novedad_show")
     * @Method("GET")
     */
    public function showAction(Novedad $novedad)
    {
        $deleteForm = $this->createDeleteForm($novedad);

        return $this->render('novedad/show.html.twig', array(
            'novedad' => $novedad,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing novedad entity.
     *
     * @Route("/{id}/edit", name="novedad_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction($id, Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $request->request->replace($data);

        $em = $this->getDoctrine()->getManager();
        $novedad = $em->getRepository('EmpresaBundle:Novedad')->find($id);

        $fecha = new \DateTime($request->request->get('fechaMsj'));
        $novedad->setFechaMsj($fecha);
        $novedad->setTexto($request->request->get('texto'));
        $novedad->setEstado($request->request->get('estado'));

        $usuarioArray= $request->request->get('usuario');
        $idUsuario = $usuarioArray['id'];
        $em = $this->getDoctrine()->getManager();
        $usuario = $em->getRepository("EmpresaBundle:Usuario")->find($idUsuario);
        $novedad->setCategoria($usuario);

        $em->persist($novedad);
        $em->flush();
        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
    }

    /**
     * Deletes a novedad entity.
     *
     * @Route("/delete/{id}", name="novedad_delete")
     * @Method("DELETE")
     */
    public function deleteAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $novedad = $em->getRepository('EmpresaBundle:Novedad')->find($id);
        if (!$novedad){
            throw $this->createNotFoundException('id incorrecta');
        }
        $em->remove($novedad);
        $em->flush();
        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
    }

    /**
     * Creates a form to delete a novedad entity.
     *
     * @param Novedad $novedad The novedad entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Novedad $novedad)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('novedad_delete', array('id' => $novedad->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
